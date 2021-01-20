#!/usr/bin/env node

const chalk = require("chalk");                 // CLI color
const boxen = require("boxen");                 // Boxing CLI output
const yargs = require("yargs");                 // CLI arguments
const marked = require("marked")                // Markdown to HTML
const frontmatter = require("front-matter");    // Markdown Front-matter parsing
const fs = require('fs');                       // File system

// TODO: pagination? Eventually something I might want?
// TODO: exceptions and errors

const options = yargs
    .usage("Usage: -e <env>")
    .option("e", { 
        alias: "e", 
        describe: "Environment", 
        type: "string", 
        demandOption: false })
    .argv;

// #########################
// Main:
// #########################

Init();
// GenerateBands();
// GenerateReleases();
// GenerateArchiveFrontPageAndMetadata();
Exit();

// #########################
// Implementation:
// #########################

function Init()
{

}

function Init2()
{
    if (options.e !== "prod") {
        options.e = "test";
    }
    
    const greeting = chalk.white.bold("\nEnvironment: " + options.e);
    
    const boxenOptions = {
     padding: 1,
     margin: 1,
     borderStyle: "round",
     borderColor: "green",
     backgroundColor: "#555555"
    };
    
    var boll;
    
    // TODO: raw content maybe in a content-folder or something in root?
    // TODO: really? Maybe just output to ../portfolio/src/app/assets
    if (IsProductionEnvironment()) {
        boll = chalk.white("\n\nEnvironment is prod.\nContent will end up in /content.");
    } else {
        boll = chalk.white("\n\nEnvironment is not prod.\nTherefore this will be a test-run.\nContent will end up in /content-test");
    }
    
    const warning = chalk.red.bold("\n\nRemember to git PULL\nbefore Push!\nDon't Overwrite Content!!\n");
    const msgBox = boxen( greeting + boll + warning, boxenOptions );
    
    console.log(msgBox);
}

function Exit()
{
    console.log(chalk.white.bold("\nDone!\n\n"));
}

function IsProductionEnvironment()
{
    return options.e === "prod";
}

function GetWritePath()
{
    // Is this needed?
    return IsProductionEnvironment() ? "../ossific-app/src/assets/content/" : "../content/";
}

function GenerateArchiveFrontPageAndMetadata()
{
    var readPath = "../content-raw/news";
    var writePath = GetWritePath();
    var files = fs.readdirSync(readPath); 
    var archive = [];
    var tags = [];
    var numberOfNewsItemsOnFrontPage = 3;

    files.forEach(function (file) {
        var contents = fs.readFileSync(readPath + "/" + file, 'utf8');

        var markdown = frontmatter(contents);
        var parsedHtml = marked.parse(markdown.body);

        markdown.attributes["tags"].forEach(tag => {
            tags.push(tag);
        });

        archive.push({ 
            name: markdown.attributes["title"],
            date: markdown.attributes["date"],
            tags: markdown.attributes["tags"],
            content: parsedHtml
        });
    });

    // Sort by date. Latest first.
    archive.sort((a, b) => b["date"] - a["date"]);

    // TODO: exclude the first "numberOfNewsItemsOnFrontPage" entries?
    fs.writeFileSync(writePath + "archive.json", JSON.stringify(archive));
    fs.writeFileSync(writePath + "news.json", JSON.stringify(archive.slice(0, numberOfNewsItemsOnFrontPage)));

    // TODO: what do I want included here?
    var uniqueTags = RemoveDuplicatesInArray(tags);
    fs.writeFileSync(writePath + "metadata.json", JSON.stringify({
        tags: uniqueTags,
        numberOfPosts: archive.length
    }));

    // "Archive per tag"
    uniqueTags.forEach(tag => {
        var result = archive.filter(post => {
            return post["tags"].includes(tag);
        });

        fs.writeFileSync(writePath + tag.toLowerCase() + ".json", JSON.stringify({
            result
        }));
    });
}

function GenerateBands()
{
    var readPath = "../content-raw/bands";
    var writePath = GetWritePath();
    var files = fs.readdirSync(readPath); 
    var bands = [];

    files.forEach(function (file) {
        var contents = fs.readFileSync(readPath + "/" + file, 'utf8');

        var markdown = frontmatter(contents);
        var parsedHtml = marked.parse(markdown.body);

        bands.push({ 
            name: markdown.attributes["name"],
            content: parsedHtml
        });
    });

    fs.writeFileSync(writePath + "bands.json", JSON.stringify(bands));
}

function GenerateReleases()
{
    var readPath = "../content-raw/releases";
    var writePath = GetWritePath();
    var files = fs.readdirSync(readPath); 
    var releases = [];

    files.forEach(function (file) {
        var contents = fs.readFileSync(readPath + "/" + file, 'utf8');

        var markdown = frontmatter(contents);
        var parsedHtml = marked.parse(markdown.body);

        // TODO: Splits? "Band" will not suffice, me thinks.
        releases.push({ 
            name: markdown.attributes["name"],
            band: markdown.attributes["band"],
            releaseDate: markdown.attributes["releaseDate"],
            content: parsedHtml 
        });
    });

    fs.writeFileSync(writePath + "releases.json", JSON.stringify(releases));
}

function RemoveDuplicatesInArray(array) {
	return array.filter(function(item, index){
		return array.indexOf(item) >= index;
	});
};