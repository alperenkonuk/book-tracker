import axios from "axios";

async function fetchBook(isbn) {
  try {
    const res = await axios.get(`https://openlibrary.org/api/books?bibkeys=ISBN:${isbn}&jscmd=details&format=json`);
    const data = res.data[`ISBN:${isbn}`];
    const imgURl = data["thumbnail_url"] || "";
    const title = data.details.title;
    const publishDate = data.details["publish_date"] || "No info";
    const pages = data.details["number_of_pages"] || "No info";
    return {
      url: imgURl.replace('S', 'L') || 'https://i.pinimg.com/736x/1c/12/f9/1c12f975ac3035dc01973e3d129b6875.jpg',
      title: title,
      publishDate: publishDate,
      pages: pages,
      isbn: isbn
    };
  } catch (e) {
    console.error("couldn't fetch book", e.stack);
  }
}

export default fetchBook;

