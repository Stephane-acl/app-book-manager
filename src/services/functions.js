export const haveRole = (givenUser = { roles: ["ROLE_USER"] }, givenRole = "USER") => {
    return givenUser.roles && givenUser.roles.length && givenUser.roles.includes("ROLE_" + givenRole) ? true : false
}

export const StringUpperCFirst = (text) => {
    if (text) return text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
    return ""
}