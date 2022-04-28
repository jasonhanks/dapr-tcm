import bcrypt from 'bcrypt'
import mongoose from 'mongoose'


/**
 * This represents the "User" that we store in the database.
 */
export interface IUser {
    username: string
    full_name: string
    initials: string
    password: string
}


// The schema used for MongoDB / Mongoose
export const Schema = new mongoose.Schema<IUser>({
    username: {
        required: true,
        type: String
    },
    full_name: {
        required: true,
        type: String
    },
    initials: {
        required: true,
        type: String
    },
    password: {
        required: true,
        type: String
    }
})


/**
 * Instance methods available for this Model.
 */
Schema.methods.authenticate = async function (this: IUser, password: string, callback: Function) {
    await bcrypt.compare(password, this.password, (err, result) => callback(result) )
}


// Export the User Model by defaults
module.exports = mongoose.model<IUser>('users', Schema)
