import {Author, Book} from "../model/index.js";

export async function findPublishersByAuthor(req, res) {
    const author = await Author.findByPk(req.params.author);
    if (!author) {
        return res.status(404).send({error: `Author with name ${req.params.author} not found`});
    }

    // const books = await author.getBooks();
    // const publishers = [...new Set(books.map(book => book.publisher))];
    // return res.json(publishers);

    const books = await Book.findAll(
        {
            include: {
                model: Author,
                as: 'authors',
                where: {name: req.params.author},
                through: {attributes: []}
            },
            attributes: ['publisher'],
            raw: true,
            group: ['publisher']
        }
    )

    return res.json(books.map(book => book.publisher));
}