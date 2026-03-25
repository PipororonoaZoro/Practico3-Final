import mongoose from 'mongoose';

export async function connectDB()
{
    try {
            await mongoose.connect('mongodb+srv://grupo-14:grupo-14@cluster0.blryo.mongodb.net/NodeMod3Cohorte5');
            console.log('Conexión exitosa a MongoDB');
        }
        catch (error)
        {
            console.error('Error al conectar a MongoDB:', error);
            process.exit(1);
        }
}