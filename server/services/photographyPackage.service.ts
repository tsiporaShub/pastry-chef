import { Request, Response } from 'express';
import photographyPackage_model from '../models/photographyPackage.model';


export const getAllPhotographyPackages = async function (req: Request, res: Response) {
    const PhotographyPackages = await photographyPackage_model.find();
    res.send(PhotographyPackages);
}


export const addPhotographyPackage = async function (req: Request, res: Response) {
    try {
        let p = JSON.parse(JSON.stringify(req.body));
        const newPhotographyPackage = {
            id: p.id,
            type: p.type,
            moneyToHour: p.moneyToHour,
        }
        const PhotographyPackages = await photographyPackage_model.find();
        if (PhotographyPackages.length === 0) {
            newPhotographyPackage.id = 0;
        }
        else {
            newPhotographyPackage.id = (PhotographyPackages[PhotographyPackages.length - 1]).id + 1;
        }
        await photographyPackage_model.insertMany(newPhotographyPackage);
        res.send('Add new  photography package succeeded');
    } catch (err) {
        res.status(409).send('error...')
    }
}


export const updatePhotographyPackage = async function (req: Request, res: Response) {
    try {
        let data = req.body;
        let id = Number(data.id);
        if (await photographyPackage_model.findOne({ id }) === null) {
            res.status(404).send('photography package not found')
            return;
        }
        await photographyPackage_model.updateOne({
            id
        }, {
            $set: {
                type: data.type,
                moneyToHour: data.moneyToHour,
            }
        })
        res.send('Update ' + id + ' succeeded');
    } catch (err) {
        res.status(409).send('error...')
    }
}


export const deletePhotographyPackage = async function (req: Request, res: Response) {
    try {
        const id = req.params.id;
        if (await photographyPackage_model.findOne({ id }) === null) {
            res.status(404).send('photography package not found')
            return;
        }
        await photographyPackage_model.deleteOne({ id });
        res.send('Delete ' + id + ' succeeded');
    } catch (err) {
        res.status(409).send('error...');
    }
}
