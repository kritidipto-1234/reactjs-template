type Reply = {
    author: {
        name?: string,
        avatar?: string,
    },
    text?: string,
    replies?: Reply[],
}


declare module '*.module.scss' {
  const classes: { [key: string]: string };
  export default classes;
}
