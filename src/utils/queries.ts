export const userQuery = (email:string) => {
    const query = `*[_type == "user" && email == '${email}']`;
    return query;
};


export const userSharedBooksQuery = (userId:string | undefined) => {
    const query = `*[ _type == 'book' && userId == '${userId}'] | order(_createdAt desc){
        cover{
          asset->{
            url
          }
        },
        _id,
        title,
        genre,
        synopsis,
        author,
        year,
        pages,
        postedBy->{
          _id,
          username,
          image
        },
        save[]{
          postedBy->{
            _id,
            userName,
            image
          },
        },
      }`;
    return query;
};

export const userSavedBooksQuery = (userId:string | undefined) => {
    const query = `*[_type == 'book' && '${userId}' in save[].userId ] | order(_createdAt desc) {
        cover{
          asset->{
            url
          }
        },
        _id,
        destination,
        postedBy->{
          _id,
          userName,
          image
        },
        save[]{
          postedBy->{
            _id,
            userName,
            image
          },
        },
      }`;
    return query;
};