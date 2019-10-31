const excelToJson = require('convert-excel-to-json');
const express = require('express');
require('../src/database/connexion');

const router = express.Router();

const Ecole = require('../src/models/Ecole');
const Eleve = require('../src/models/Eleve');

Ecole.hasMany(Eleve, {
    as: 'eleves',
    foreignKey: 'ecoleId'
    
});
Eleve.belongsTo(Ecole, {
    as: 'ecole',
    foreignKey: 'ecoleId',
    onDelete: 'CASCADE'
});


router.post('/upload', async (req, res) => {

    excelFile = req.files.excelFile;
    logoFile = req.files.iepLogo;

    excelFilename = req.body.ecoleCode + '.xls';
    logoFileName = req.body.ecoleInspection + '_logo.jpg';
    let response = {};
    let createdEcole;

    try {

        await logoFile.mv('./uploads/logos/' + logoFileName, (error, result) => {   
            if (error)
                throw error; 
        });
        await excelFile.mv('./uploads/' + excelFilename, (error, result) => {   
            if (error)
                throw error; 
        });
        createdEcole = await createEcole(req.body);
        if (createdEcole.success){
            let ecole = await Ecole.findAll({ where: { ecoleCode: req.body.ecoleCode }});
            const id = ecole[0].dataValues.ecoleId;
            let eleves = eleve_to_json(excelFilename);
            if (eleves.success) {
                eleves = eleves.eleves.Feuil1;
                for (let i = 0; i < eleves.length; i++) {
                    await Eleve.create({
                        nom: eleves[i].nom,
                        prenoms: eleves[i].prenoms,
                        dateNaissance: eleves[i].dateNaissance,
                        lieuNaissance: eleves[i].lieuNaissance,
                        genre: eleves[i].genre,
                        niveau: eleves[i].niveau,
                        matricule: eleves[i].matricule,
                        contact: eleves[i].contact,
                        ecoleId: id 
                    });
                }
                response = {
                    success: true,
                    msg: 'Les éleves ont été inserés avec succès.'
                };
            } else {
                response = {
                    success: false,
                    msg: 'Une erreur inattendue est survenue, les élèves n\'ont pu être enregistrés !'
                }
            } 

        } else{
            response = {
                success: false,
                msg: 'Veuillez verifier votre fichier excel et reessayez...'
            }
        } 
            
    } catch(error) {
        response = {
            success: false,
            msg: 'Une erreur inattendue s\'est produite, verifiez le fichier excel et réessayez',
            error: error
        }
    }

    res.send(response); 
});

router.get('/ecoles', async (req, res) => {
    try{
        let ecoles = await Ecole.findAll({ 
            include: [{ model: Eleve, as: 'eleves'}]
        });
        // res.json(ecoles[0].eleves.length)
        res.json(ecoles)
    }catch(error){
       res.json({ code: 'failed', message: 'Aucun agent trouvé ' + error });
    }
    
});

router.get('/cards/generate/:code', async (req, res) => {
    try {
        const ecoles = await Ecole.findAll({
            include: [{
                model: Eleve,
                as: 'eleves'
            }]
        });
        if (ecoles != null) {
            res.json(ecoles);
        }
    } catch (error) {
        res.json(error);
    }
});

router.put('cards/update/:ecole', async (req, res) => {
    try {
        res.send('Update Ecole !!!');
    } catch (error) {
        console.log(error);
    }
});

router.delete('/cards/:ecoleId', async (req, res) => {
    ecoleId = req.params.ecoleId;
    console.log(ecoleId)
    try {
        let deleted = await Ecole.destroy({ where: { ecoleId: ecoleId }});
        deleted = await Eleve.destroy({ where: { ecoleId: ecoleId }});
        res.send({success: true, msg: 'Les données ont bien étés supprimés'});
    } catch (error) {
        console.log(error);
        res.send({success: false});
    }
});

function eleve_to_json(filename) {
    const path = './uploads/' + filename;
    const param = {
        sourceFile: path,
        header: {
            rows: 1
        },
        columnToKey: {
            B: 'codeecole',
            C: 'matricule',
            D: 'nom',
            E: 'prenoms',
            F: 'dateNaissance',
            G: 'lieuNaissance',
            H: 'genre',
            I: 'niveau',
            J: 'contact'
        }
    };

    try {
        const eleves = excelToJson(param);
        if (eleves.Feuil1[0]) {
            return {
                success: true,
                eleves: eleves
            }
        } else {
            return {
                success: false
            }
        }
    } catch (error) {
        return {
            success: false,
            error: error
        }
    }

}

async function createEcole(data){
    try{
        return await Ecole.create({
        ecoleNom: data.ecoleNom,
        ecoleCode: data.ecoleCode,
        anneeScolaire: data.anneeScolaire,
        ecoleInspection: data.ecoleInspection,
        ecoleDren: data.ecoleDren,
        iepLogo: data.ecoleInspection + '_logo.jpg'
        }).then(resolve => {
            return {
                success: true, 
                msg: 'L\'ecole a été enregistré avec succès', 
            };
        });

    }catch(error){
        return {
            success: false,
            msg: 'Une erreur est survenue lors de l\'enregistrement de l\'ecole',
            error: error
        };
    }  
}


module.exports = router;