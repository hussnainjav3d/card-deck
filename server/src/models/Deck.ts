import mongoose from 'mongoose'
const Schema = mongoose.Schema;
// const ObjectId = mongoose.Types.ObjectId;

const DeckSchema = new Schema({
  title: {
          type:String,
          required: true
        },
  author: {
          type:String,
          required: true
        },
});

const DeckModel = mongoose.model("Deck", DeckSchema)

export default DeckModel