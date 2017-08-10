console.log('Starting app');

const fs = require('fs');
const os = require('os');
const _ = require('lodash')
const yargs = require('yargs')
insta

const notes = require('./notes.js')

const titleOptions = {
					decribe: 'Title of note',
					demand: true,
					alias: 't'
				};
const bodyOptions = {
					decribe: 'Body of note',
					demand: true,
					alias: 'b'
				};

const argv = yargs
			.command('add', 'Add a new note', {
				title: titleOptions,
				body: bodyOptions,
			})
			.command('list', 'List all nodes')
			.command('read', 'Read a note', {
				title: titleOptions
			})
			.command('remove', 'Remove a note', {
				title: titleOptions
			})
			.help()
			.argv
var command = argv._[0]


switch(command){
	case 'add': 
		var note = notes.addNote(argv.title, argv.body)
		if(note){
			console.log('Note created')
			notes.logNote(note)
		} else{
			console.log('Note title taken!')
		}
		break
	case 'list':
		var allNotes = notes.getAll()
		console.log(`Printing ${allNotes.length} note(s)`)
		_.forEach(allNotes, note => console.log(notes.logNote(note) + '\n'))
		break;
	case 'read': 
		var note = notes.getNote(argv.title)
		if(note){
			console.log(`Note found: \n `)
			notes.logNote(note)
		}else{
			console.log('Note not found')
		}
		break;
	case 'remove':
		var removed = notes.removeNote(argv.title)
		message  = removed ? 'Notes removed' : 'Notes not found'
		console.log(message)
		break;
	default:
		console.log('Command not recognized')
}

/*
var filteredArray = _.uniq([2,1,2])
console.log(filteredArray)




console.log(_.isString(true))
console.log(_.isString('true'))
*/
//console.log(notes.addNote())

//console.log('Zbroj dvije je: '+notes.add(3, 2))

//var user = os.userInfo()

//fs.appendFile('greet.txt', `Hello world to greet. Hello ${user.username}. YOu are ${notes.age}`)
