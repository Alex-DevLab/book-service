import {Author, Book, Publisher} from "../model/index.js";
import {sequelize} from "../config/database.js";

export const addBook = async (req, res) => {

    const t = await sequelize.transaction();

    try {
        const {isbn, title, authors, publisher} = req.body;

        const existingBook = await Book.findByPk(isbn);
        if (existingBook) {
            await t.rollback();
            return res.status(409).send({error: `Book with ISBN ${isbn} already exists`});
        }

        // Create or find the publisher
        let publisherRecord = await Publisher.findByPk(publisher);
        if (!publisherRecord) {
            publisherRecord = await Publisher.create({publisher_name: publisher}, {transaction: t});
        }

        // Process the authors array
        const authorRecords = [];
        for (const author of authors) {
            let authorRecord = await Author.findByPk(author.name);
            if (!authorRecord) {
                authorRecord = await Author.create({
                    name: author.name,
                    birth_date: new Date(author.birthDate)
                }, {transaction: t});
            }
            authorRecords.push(authorRecord);
        }

        // Create a new book
        const book = await Book.create({isbn, title, publisher}, {transaction: t});
        await book.setAuthors(authorRecords, {transaction: t});
        await t.commit();
        return res.status(201).send({message: `Book with ISBN ${isbn} created successfully`});

    } catch (e) {
        await t.rollback();
        console.log('Error adding book: ', e);
        return res.status(500).send({
            error: e.message, message: 'Internal server error'
        });
    }
}