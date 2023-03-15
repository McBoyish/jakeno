import type { NextPage } from 'next';
import React from 'react';
import About from 'src/About';
import Layout from 'src/common/Layout';

const AboutPage: NextPage = () => {
	return (
		<Layout>
			<About />
		</Layout>
	);
};

export default AboutPage;
