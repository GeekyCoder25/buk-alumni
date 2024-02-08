import React from 'react';
import {Vortex} from 'react-loader-spinner';

const Loading = () => {
	return (
		<div className="w-full h-screen flex items-center justify-center">
			<Vortex
				colors={[
					'#0291dc',
					'#0291dc',
					'#0291dc',
					'#0291dc',
					'#0291dc',
					'#0291dc',
				]}
				width={150}
				height={150}
			/>
		</div>
	);
};

export default Loading;
