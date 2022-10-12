import React from 'react';
import Head from 'next/head';

function SEO() {
	return (
		<Head>
			<title>{'Jakeno'}</title>
			<link rel='icon' href='/ufo.png' />
			<meta
				name='description'
				content={
					'Create new public or private rooms where you can chat with other people, anonymously or by registering an account!'
				}
			/>
			<meta
				name='keywords'
				content={
					'join room, create room, chat, message, username, login, register, jakeno, private, public, chat room, room'
				}
			/>
		</Head>
	);
}

export default SEO;
