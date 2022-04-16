//const { optimize, Template } = require("webpack");
const HtmlWebPack = require("html-webpack-plugin");//Importando el plugin del webpack
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    //S especifica como va a quedar el codigo del main ya sea para leer de manera eficiente o para desplegarlo a produccion
    mode: 'development',
    //Es para limpiar nuestra carpeta de distribucion cada bez que agamos el npm run build, es decir si ates se tenia uan rachivo lo borra y lo reemplaza por el nuevo
    output: {
        clean: true
    },
    module: {
        rules: [
            {
                //hace un barrido de todos los archivos del proyecto y hace enfacis en solo los que tienen la extencion html (los encuentra todos porque se le coloca el $ de lo contrario lo recuperar el primeroq ue encuentre)
                //Ademas tambien es para que no genre erores a la hora de generar nuestro archivo html para desplegarlo en produccion
                test: /\.html$/i,
                //Una vez encontrados los archivos html se llama el louder el cual se instalo y su dependecia se agrego al archivo json, este sirve para que no me genere errores y que aga uso de la dependecia para poder desplegar la aplicacion html a produccion
                loader: 'html-loader',
                //El sources perminte hacer dinamicas varias cosas por ejemplo si en un archivo html tenemos un atributo que carge imagenes entonces tambien lo mueve y hace un has (pero ene ste caso lo aremos manuel por eso esta en falso)
                options: {
                    minimize: false,
                    sources: false,

                }

            },
            {
                //Esta regla siver para hacer un barrido de todos los archivos y que recupere todos los que tenga la extencion .css y para que al hacer importacion esteso archivos en nuestro codigo js no genere errores
                //Ademas tambien me permite traducir el codigo css a javascript al momento de importar la hoja de estilos en archivo js
                test: /\.css$/i,
                //Esto se hace porque en las reglas si funciona una relacionada por ejemplo a esto de los estilos css entonces la sieguente regla de estilos ya no se aplicara
                //por lo tanto se excluye el styles.css para que se aplique la siguente rgla de estilos y pueda dejarse de manera gloval la hoa de estilos para que en el html de la carpeta de distribicon aparesca relacionado con el archvio css
                exclude: /styles.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /styles.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"],

            },
            {
                test: /\.(png|jpe?g|gif)$/,
                loader: 'file-loader',
                //Esto evita que se creen imagens cahe dentro de la carpoeta de distribucion
                options: {
                    name: 'assets/img/[name].[ext]',

                },
            },

        ],
    },
    optimization: {},

    plugins: [//A hacer esto me crea una nueva instancia del plugin y me crea en la carpeta de distribucion el archivo html para desplegarlo a produccion y lo relaciona con el main que se genero
        new HtmlWebPack({
            //Le cambia el titulo al archivo ahtml resultante (pero no en la extencion por ejemplo lll.html, sino al nombre de la pagina)
            title: "Mi WebPack App",
            //Crea la nueva instacio del archivo html a partir del archivo en el cual tenemos nuestraes etiquetas y todo nuestro codigo html pero relaciona ese archivo resultanto con el main que se genera dentro de la carpeta de distribucion
            template: "./src/index.html"
        }),
        new MiniCssExtractPlugin({
            //Le damos un nombre al archivo que creamos
            filename: "nuevo-estilo.css",
            //Le decimos que no importa el orden de la importacion de los estilos
            ignoreOrder: false,
        }),
        new CopyPlugin({
            patterns: [
                { from: "src/assets/", to: "assets/" },
            ],
        }),
    ],
}


//Curso-JavaScript\WebPack-inicial
