import {Author, Book} from "../model/index.js";
import {sequelize} from "../config/database.js";

export async function findBookAuthorsByISBN(req, res) {
    const book = await Book.findByPk(req.params.isbn);
    if (!book) {
        return res.status(404).send({error: `Book with ISBN ${req.params.isbn} not found`});
    }
    const authors = await book.getAuthors({
        joinTableAttributes: [],
        attributes: {
            include: ['name', [sequelize.col('birth_date'), 'birthDate']],
            exclude: ['birth_date']
        }
    });
    return res.status(200).send(authors);
}

export async function removeAuthor(req, res) {
    const t = await sequelize.transaction();

    try {
        const author = await Author.findByPk(req.params.author, {
            transaction: t,
            joinTableAttributes: [],
            attributes: {
                include: ['name', [sequelize.col('birth_date'), 'birthDate']],
                exclude: ['birth_date']
            }
        });

        if (!author) {
            await t.rollback();
            return res.status(404).send({error: `Author with name ${req.params.author} not found`});
        }

        if ((await author.getBooks({transaction: t})).length > 0) {
            await t.rollback();
            return res.status(400).send({error: `Author ${req.params.author} has books. Remove them first`})
        }

        await author.destroy({transaction: t});
        await t.commit();
        return res.status(200).send(author);

    } catch (e) {
        await t.rollback();
        console.log('Error removing author: ', e);
        return res.status(500).send({
            error: e.message,
            message: 'Failed to remove author'
        })
    }
}