import PropTypes from "prop-types"
import React, {Fragment, useState, useEffect} from "react"
import {StringUpperCFirst} from "../../services/functions";
import API from "../../services/API";
import {Link} from "react-router-dom";
import './../../assets/purpose.css';
import useComponentVisible from "./useComponentVisible";

const OmniSearch = ({id, titleTextSearch, arrowNav, history}) => {

    const {ref, isComponentVisible, setIsComponentVisible} = useComponentVisible(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [omnisearchVisible, setOmnisearchVisible] = useState(false);
    const [bookList, setBookList] = useState([]);
    const [currentSelection, setCurrentSelection] = useState(arrowNav ? 0 : -1);
    const [, setLoading] = useState(true);
    const [recentsBooks, setRecentsBooks] = useState([]);

    // Récupère les livres recents
    useEffect(() => {
        if (!omnisearchVisible) return
            ;
        (async function () {
            setLoading(true)
            try {
                const recents = await API.findAll('BOOKS', "?order[id]=desc")
                setRecentsBooks(recents)
                setBookList(recents)
                setLoading(false)
            } catch (e) {
                setLoading(false)
                console.error(e)
            }
        })()
    }, [omnisearchVisible]);

    const updateSelection = (newSelection) =>
        setCurrentSelection(Math.max(0, Math.min(bookList.length - 1, Math.max(0, newSelection))))

    const handleKeys = (e) => {
        switch (e.key) {
            case "ArrowDown":
                updateSelection(currentSelection + 1)
                break
            case "ArrowUp":
                updateSelection(currentSelection - 1)
                break
            case "Enter":
                history.replace('/booksDetails/' + bookList[currentSelection].id);
                break
            default:
                break
        }
    }

    const searchBook = async (value) => {
        setSearchQuery(value)
        if (!value.length) {
            setBookList(recentsBooks)
            return
        }
        try {
            setLoading(true)
            const results = await API.findAll('BOOKS', "?title=" + value)
            setBookList(results)
            setLoading(false)
        } catch (e) {
            setLoading(false)
            setBookList(recentsBooks)
            console.error(e)
        }
    };

    const OnClickVisible = () => {
        setOmnisearchVisible(true);
        setIsComponentVisible(true);
    };

    const OnclickSearchLoop = (e) => {
        bookList.length === 0 ? e.preventDefault() : history.replace('/booksDetails/' + bookList[currentSelection].id);
    };

    return (
        <div id={id} className="omnisearch" onKeyDown={arrowNav ? handleKeys : undefined}>
            <div className="container">
                <form className="omnisearch-form">
                    <div className="form-group">
                        <div className="input-group input-group-merge">
                            <input
                                value={searchQuery}
                                onChange={(event) => searchBook(event.target.value)}
                                type="text"
                                name="title"
                                className="form-control"
                                placeholder={"Rechercher par titre"}
                                autoComplete={"off"}
                                onClick={OnClickVisible}
                            />
                            <div className="input-group-append">
								<span className="input-group-text">
									<button
                                        id="omnisearch-close"
                                        className="btn"
                                        onClick={OnclickSearchLoop}
                                        style={{boxShadow: "none"}}
                                    >
										<i className="fa fa-search fa-2x"/>
									</button>
								</span>
                            </div>
                        </div>
                    </div>
                </form>
                {isComponentVisible &&
                <div className="omnisearch-suggestions" ref={ref}>
                    <h6 className="heading">{bookList.length ? titleTextSearch : ""}</h6>
                    <div className="body-imageEffect loading">
                        <main>
                            <ul className="menu list-unstyled">
                                {bookList &&
                                bookList.map((b, key) => (
                                    <Fragment key={key}>
                                        {key <= 9 && (
                                            <li className={key === currentSelection ? "selected" : ""}>
                                                <button
                                                    type="button"
                                                    className="btn btn-link p-0"
                                                    data-action="omnisearch-close"
                                                    data-target={"#" + id}
                                                >
                                                    <div className="menu__item" data-img="../2.jpg">
                                                         <span className="menu__item-text">
                                                             <span className="menu__item-textinner">
                                                                <Link to={'/booksDetails/' + b.id}>
                                                                    {StringUpperCFirst(b.title)}
                                                                </Link>
                                                             </span>
                                                         </span>
                                                        {key === currentSelection &&
                                                        <span className={key === currentSelection ? "menu__item-sub" : ""}>
                                                            {b.author?.firstName} {b.author?.lastName}
                                                        </span>
                                                        }
                                                    </div>
                                                </button>
                                            </li>
                                        )}
                                    </Fragment>
                                ))}
                                {bookList.length <=0 && <h3 className="no-result">Aucun résultat</h3>}
                            </ul>
                        </main>
                    </div>
                </div>
                }
            </div>
        </div>
    )
}

OmniSearch.propTypes = {
    id: PropTypes.string.isRequired,
    placeholderTitle: PropTypes.string,
    placeholderLastName: PropTypes.string,
    handleClickElement: PropTypes.func,
    titleTextSearch: PropTypes.string.isRequired,
    setElement: PropTypes.object,
    arrowNav: PropTypes.bool,
}

export default OmniSearch
