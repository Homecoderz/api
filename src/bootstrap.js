module.exports = async () => {
    const Ecole = require('./models/Ecole');
    const Eleve = require('./models/Eleve');

    Ecole.hasMany(Eleve, { as: 'eleves', foreignKey: 'ecoleId'});
    Eleve.belongsTo(Ecole, { as: 'ecole', foreignKey: 'ecoleId'});

    const errorHandler = (err) =>{
        console.error('Error', err);
    }

    const ecole = await Ecole.create({
        ecoleNom: 'EPP DIAWAla 1',
        ecoleCode: 'E001107',
        anneeScolaire: '2019-2020',
        ecoleInspection: 'IEPP DIAWALA',
        ecoleDren: 'FERKESSEDOUGOU'
    }).catch(errorHandler);

    const ecoles = await Ecole.findAll().catch(errorHandler);
    console.log(ecoles);
}