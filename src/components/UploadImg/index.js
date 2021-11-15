import React, { useState } from "react"
import { Typography } from '@material-ui/core';
import FileBase64 from 'react-file-base64';
import imageCompression from 'browser-image-compression';
import getBase64 from '../../services/toBase64'
import emptyMaterial from "./../../image/emptyMaterial.png";
import Loading from '../Reload';
import "./styles.css";

function UploadImg(props) {
	const {
		setErrorTitlePhoto,
		setErrorShowPhoto,
		img,
		imgBackground,
		setImg,
		title,
		subTitle,
	} = props

	const [load, setLoad] = useState(false);


	async function onUploadImage(element) {
		if (element.file.type.includes('image') !== true) {
			setErrorTitlePhoto("Não é uma imagem!")
			setErrorShowPhoto(true);
			setLoad(false)
			return
		}
		var options = {
			maxSizeMB: 0.07,
			maxWidthOrHeight: 300,
			useWebWorker: true
		}
		try {
			const imgCmp = await imageCompression(element.file, options);
			getBase64(imgCmp, finishToBase64)
			setLoad(false)
		} catch (error) {
			console.log(error)
			setLoad(false)
			setErrorTitlePhoto("Não foi possível carregar a imagem!")
			setErrorShowPhoto(true);
		}
	};

	const finishToBase64 = (imageB64) => {
		setImg(imageB64)
	}

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center'
			}}
		>
			<Typography
				variant="h6"
				component="h6"
				style={titleStyle}
			>
				{title}
			</Typography>

			<img
				alt="Imagem"
				style={imgStyle}
				src={img || imgBackground || emptyMaterial}
			/>

			{!img &&
				<div
					style={buttonImgStyle}
				>
					<FileBase64
						multiple={false}
						onDone={element => {
							setLoad(true)
							onUploadImage(element)
						}}
					/>
				</div>
			}

			{img &&
				<button
					style={buttonImgStyle}
					onClick={() => {
						setImg(undefined)
					}}
				>
					{subTitle}
				</button>
			}
			{load && (
				<Loading />
			)}

		</div>
	)
}

const titleStyle = {
	marginBottom: 20,
	border: '2px solid #2AA9E0',
	padding: 10,
	borderTopLeftRadius: 20,
	borderTopRightRadius: 20,
	borderBottomRightRadius: 20,
	borderBottomLeftRadius: 20,
}

const imgStyle = {
	width: '10rem',
	height: '10rem',
	borderRadius: '50%',
	overflow: 'hidden',
	backgroundColor: '#2AA9E0',
	display: 'flex',
	alignItems: 'center'
}

const buttonImgStyle = {
	marginTop: '1rem',
	background: '#2AA9E0',
	border: 'none',
	padding: '0.4rem 3rem',
	maxWidth: '100%',
	borderRadius: '2rem',
	color: 'white',
	marginBottom: '1rem'
}

export default UploadImg;