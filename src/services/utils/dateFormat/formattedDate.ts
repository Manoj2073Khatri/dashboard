
export const formattedDate = ({date}:any) => {
    const newDate = new Date(date);
    const formattedDate = newDate.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric"
    })
    return formattedDate;
}
