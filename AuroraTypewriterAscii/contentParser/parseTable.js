import * as fs from 'fs';
import * as path from 'path';
import * as csv from 'fast-csv';

let output = [];
let count = 0;

fs.createReadStream(path.resolve('../', 'assets', 'patentsPens.csv'))
    .pipe(csv.parse({ headers: true }))
    .on('error', error => console.error(error))
    .on('data', row =>{
        count++;
        let text = row.row;

        let tmpObj = row;
        let aaa = parseRow(text);

        tmpObj.id = count;
        tmpObj.patent_number = aaa[0];
        tmpObj.year = parseInt(aaa[1]);
        tmpObj.appliant = aaa[2];
        tmpObj.description = aaa[3];

         output.push(tmpObj);

    })
    .on('end', (rowCount) => {
        console.log(`Parsed ${rowCount} rows`)
        // console.log(output);
        saveOutputToFile(output);
    });

function parseRow(row) {
    // Regex to extract the required fields
    const pattern = /Patent ([^,]+), applied in (\d{4}), by ([^,]+), [^\.]+\. (.+)/;
    const match = row.match(pattern);
    if (match) {
        const patent_number = match[1].trim();
        const year = match[2].trim();
        const appliant = match[3].trim();
        const description = match[4].trim();
        return [patent_number, year, appliant, description];
    } else {
        return [null, null, null, null];
    }
}

function saveOutputToFile(output) {
    const outputPath = path.resolve('../', 'assets', 'parsed_patents.json');
    fs.writeFileSync(outputPath, JSON.stringify(output, null, 2), 'utf-8');
    console.log(`Output saved to ${outputPath}`);
}
