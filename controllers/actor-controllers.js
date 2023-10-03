import ActorsModel from '../moduls/ActorsModel.js'

export const MakeActor = async (req, res) => {
  const { name, img } = req.body
   if (!name && !img) {
    return res.status(400).json({ msg: 'Provide all the values' })
  }

  try {
    await ActorsModel.create({ name, img })
    return res.status(200).json({ msg: 'Actor Added succsessfully' })
  } catch (error) {
    return res.status(500).json({ msg: 'Server Error' })
  }
}

export const GetActors = async (req, res) => {
  try {
    const actors = await ActorsModel.find({})

    return res.status(200).json({ actorsData: actors })
  } catch (error) {
    return res.status(500).json({ msg: 'Server Error' })
  }
}

export const DeleteActor = async (req, res) => {
  let { id } = req.params

  try {
    await ActorsModel.findByIdAndDelete(id)
    return res.status(200).json({ msg: 'Actor Deleted' })
  } catch (error) {
    return res.status(500).json({ msg: 'Server Error', error: error.message })
  }
}

export const UpdateActor = async (req, res) => {
  const { id } = req.params
   try {
    await ActorsModel.findByIdAndUpdate(id, req.body)
    return res.status(200).json({ msg: 'Actor Updated' })
  } catch (error) {
    return res.status(500).json({ msg: 'Server Error', error: error.message })
  }
}
