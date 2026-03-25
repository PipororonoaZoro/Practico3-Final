import mongoose from 'mongoose';

export async function connectDB()
{
    try {
            await mongoose.connect('mongodb+srv://macielponce9989_db_user:boca1324@clustercatamarca.jmgfbbx.mongodb.net/?appName=ClusterCatamarca');
            console.log('Conexión exitosa a MongoDB');
        }
        catch (error)
        {
            console.error('Error al conectar a MongoDB:', error);
            process.exit(1);
        }
}