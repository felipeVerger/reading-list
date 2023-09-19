export const userQuery = (email:string) => {
    const query = `*[_type == "user" && email == '${email}']`;
    return query;
};