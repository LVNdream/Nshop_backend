const app = require("./app");
const config = require("./app/config");
const MongoDB = require("./app/utils/mongodb.util");

async function startServer() {
    try {
        await MongoDB.connect(config.db.uri);
        console.log("Connected to the database!");

        // const array = [30, 14, 13, 17, 25];
        // const target = 30;
        // let index1
        // let index2
        // const length_array =array.length
        // for (let i = 0; i < length_array - 1; i++) {
        //     // console.log(i)
        //     var a = array[i];
        //     for (let j = i+1; j < length_array; j++) {
        //         // console.log('sss',j)
        //         var b = array[j];
        //         if (a + b == target) {
        //             // console.log(a, b)
        //             index2 = j;
        //             index1 = i
        //             break;
        //         }

        //     }
        //     if (a + b == target) {
        //         break;
        //     }
        // }
        // console.log(array[index1], array[index2]);



        // let matrix_90degrees='';
        // const matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
        // // vì đây là ma trạn vuông nên tính length được
        // const matrix_length = matrix.length;
        // for (let i =0; i <matrix_length; i++) {
        //     for (let j = matrix_length-1; j >=0; j--) {
        //         matrix_90degrees=matrix_90degrees + matrix[j][i]+" "          
        //     }
        //     matrix_90degrees=matrix_90degrees+'\n';
            
        // }
        // console.log(matrix_90degrees)

        const PORT = config.app.port;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}.`);

        });



    } catch (error) {
        console.log(("Cannot connect to the database!", error));
        process.exit();
    }
}
startServer();
