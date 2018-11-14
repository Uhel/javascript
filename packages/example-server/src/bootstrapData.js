const uuid = require('random-uuid-v4');

const bootstrapData = async (prisma) => {
	await prisma.upsertChannel({
		where: { title: 'general' },
		create: { title: 'general' },
		update: {},
	});
	// await prisma.createMessage({
	// 	content: 'aaa',
	// 	author: { connect: { id: johnDoe.id } },
	// 	channel: { connect: { id: generalChannel.id } },
	// });
	// await prisma.upsertMessage({
	// 	where: { id: uuid() },
	// 	create: {
	// 		content: 'aaa',
	// 		author: { connect: { id: johnDoe.id } },
	// 		channel: { connect: { id: generalChannel.id } },
	// 	},
	// 	update: { content: `${Math.random()}` },
	// });
};

module.exports = bootstrapData;
