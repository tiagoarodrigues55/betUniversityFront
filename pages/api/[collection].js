import { ObjectId } from 'mongodb';
import client from '../../services/mongodb'

export default function handler(req, res) {
  return new Promise((resolve, reject)=>{
  const {filter = null, order = '', collection } = req.query

  const {method} = req
  client.connect(async err => {
    const collectionRawData = client.db("betUniversity").collection(collection);
    switch (method) {
      case 'GET':
        const Filter = filter ? filter : {}
        console.log(new Object(Filter))
        const collectionData = await collectionRawData.find(Filter.id?{_id: ObjectId(Filter.id)}: new Object(Filter)).toArray()

        res.status(200).json(collectionData)
        resolve()
        break
      case 'POST':
        const postResponse = await collectionRawData.insertOne(req.body)
        res.status(200).json(postResponse)
        resolve()
        break
      case 'PUT':
        var putResponse = {}
        const putFilter = JSON.parse(filter) 
        if(putFilter.event_id){
          putResponse = await collectionRawData.updateMany(putFilter, {$set:req.body})
        }else{
          putResponse = await collectionRawData.updateOne({_id: ObjectId(putFilter.id)}, {$set:req.body})
        }
        res.status(200).json(putResponse)
        resolve()
        break
      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT'])
        res.status(405).end(`Method ${method} Not Allowed`)
    }
  })

});
}