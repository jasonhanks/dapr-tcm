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
    is_admin: boolean
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
    },
    is_admin: {
        required: true,
        type: Boolean
    },
})


/**
 * Instance methods available for this Model.
 */
Schema.methods.authenticate = async function (this: IUser, password: string, callback: Function) {
    await bcrypt.compare(password, this.password, (err, result) => callback(result) )
}


/**
 * Encrypt the plain text password and generate an encrypted password to store.
 * @param password the plain text password to encrypt
 * @param callback the callback to invoke with the encrypted password
 */
Schema.statics.encryptPassword = (password: string, callback: Function) => {
    // Generate a unique salt for this password
    bcrypt.genSalt(10, (err: any, salt: string) => {
        if (err) return callback(err)
   
        // Hash the password using the unique salt
        bcrypt.hash(password, salt, function(err: any, hash: string) { return callback(err, hash) })
      })
}


// Export the User Model by defaults
module.exports = mongoose.model<IUser>('users', Schema)
