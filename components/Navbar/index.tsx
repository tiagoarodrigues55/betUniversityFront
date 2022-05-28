import { useState } from 'react';

import Router from 'next/router';
import Link from 'next/link';
import Image from 'next/image';

import { BiUserCircle } from 'react-icons/bi';
import { FiMenu } from 'react-icons/fi';
import { IoMdClose } from 'react-icons/io';

import { BackgroundDiv, DrawerDivStyled } from './style';

import UniBet from '../../assets/UniBet.png';

import { useAuth } from '../../hooks/auth/auth';

import { Logout } from '../../utils/logout';

interface INavbar {
	title: string;
	link: string;
}

export const Navbar = ({ title, link }: INavbar) => {
	const [isHiddenBackdrop, setIsHiddenBackdrop] = useState(true);
	const [isHiddenMenu, setIsHiddenMenu] = useState(true);

	const { removeData } = useAuth();

	const triggerMenu = () => {
		setIsHiddenBackdrop(!isHiddenBackdrop);
		setIsHiddenMenu(!isHiddenMenu);
	};

	return (
		<div className="is-12">
			<nav
				className="navbar is-hidden-touch is-white px-6 is-flex is-align-items-center is-justify-content-space-between"
				role="navigation"
				aria-label="main navigation"
			>
				<div className="container is-flex is-align-items-center is-justify-content-space-between is-flex-grow-1">
					<div className="py-6 px-6 is-flex is-justify-content-start">
						<div className="px-2">
							<div className="navbar-brand py-3">
								{/* <Link onClick={() => window.location.href = '/taker')}> */}
								<a
									onClick={() => {
										Router.push('/taker');
									}}
								>
									<Image src={UniBet} alt="logo" width={150} height={75} />
								</a>

								<a
									href="#navbar"
									id="burger"
									aria-label="menu"
									className="navbar-burger"
									aria-expanded="false"
								>
									<span aria-hidden="true"></span>
									<span aria-hidden="true"></span>
									<span aria-hidden="true"></span>
								</a>
							</div>
						</div>
					</div>

					<div className="navbar-menu px-6 is-flex is-justify-content-flex-end">
						<div className="navbar-item is-hidden-touch">
							<a
								href=""
								target="_blank"
								rel="noreferrer"
								className="has-text-grey is-flex is-flex-direction-row is-align-items-center"
							>
								<div
									className="has-background-purple mx-2"
									style={{
										width: '3px',
										height: '3px',
										borderRadius: '100%',
									}}
								/>{' '}
								Fale com a gente
							</a>
						</div>

						<div className="navbar-item px-2">
							<div
								onClick={() => (window.location.href = link)}
								className="has-text-purple has-text-weight-semibold is-flex is-align-items-center is-clickable"
							>
								<BiUserCircle className="mx-1" /> {title}
							</div>

							<div
								className="mx-2 has-background-purple"
								style={{
									width: '2px',
									height: '24px',
									borderRadius: '4px',
								}}
							/>

							<span
								onClick={() => {
									removeData();
									Logout();
									Router.push('/');
								}}
								className="is-clickable has-text-purple has-text-weight-semibold"
							>
								Sair
							</span>
						</div>
					</div>
				</div>
			</nav>

			<nav className="is-hidden-desktop has-background-white py-6 is-flex is-flex-direction-row is-align-items-center is-justify-content-space-around px-2">
				<Link href="/taker">
					<Image src={UniBet} alt="logo" width={140} height={50} />
				</Link>

				<FiMenu onClick={triggerMenu} className="has-text-purple is-size-3" />

				<BackgroundDiv
					onClick={triggerMenu}
					className={`${isHiddenBackdrop && 'hidden'}`}
					id="backdrop"
				></BackgroundDiv>

				<DrawerDivStyled
					className={`${
						isHiddenMenu && 'is-hidden'
					} is-flex is-flex-direction-column is-justify-content-center animate__animated animate__slideInRight`}
					id="drawer"
				>
					<div className="column is-half py-4">
						<div className="is-12 has-text-right">
							<IoMdClose
								onClick={triggerMenu}
								className="has-text-grey is-size-3"
							/>
						</div>

						<div className="mt-4">
							<div
								onClick={() => (window.location.href = link)}
								className="is-size-5 mb-3 has-text-grey has-text-weight-semibold is-flex is-flex-direction-row is-align-items-center is-clickable"
							>
								<div
									className="has-background-purple mx-2"
									style={{
										width: '3px',
										height: '3px',
										borderRadius: '100%',
									}}
								/>{' '}
								{title}
							</div>

							<a
								href=""
								className="is-size-5 has-text-grey has-text-weight-semibold is-flex is-flex-direction-row is-align-items-center"
							>
								<div
									className="has-background-purple mx-2"
									style={{
										width: '3px',
										height: '3px',
										borderRadius: '100%',
									}}
								/>{' '}
								Fale com a gente
							</a>
						</div>

						<div className="is-12 pb-3 has-text-centered mt-6">
							<span
								onClick={() => {
									removeData();
									Logout();
									Router.push('/');
								}}
								className="is-clickable is-size-4 has-text-purple has-text-weight-semibold"
							>
								Sair
							</span>
						</div>
					</div>
				</DrawerDivStyled>
			</nav>
		</div>
	);
};
