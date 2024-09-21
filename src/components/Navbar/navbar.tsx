    import {  Navbar, NavbarContent } from "@nextui-org/react";
    import { BurguerButton } from "./burguer-button";
    import { UserDropdown } from "./user-dropdown";
    import { DarkModeSwitch } from "./darkModeSwitch";
    import useUserData from "@/hooks/useUserData";
import FilterComponent from "./filter-component";



    interface Props {
    children: React.ReactNode;

    }

    export const NavbarWrapper = ({ children }: Props) => {
        const { userData, isLoading, error } = useUserData();
        return (
        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            <Navbar
                isBordered

                className="w-full"
                classNames={{
                wrapper: "w-full max-w-full",
                }}
            >
                <NavbarContent className="md:hidden">
                    <BurguerButton />
                </NavbarContent>

                <NavbarContent
                    justify="start"
                    className="w-fit data-[justify=right]:flex-grow-0"
                >

                    <FilterComponent />

                    <NavbarContent justify="end">
                        
                        <DarkModeSwitch />
                            <p>{userData?.fullname}</p>
                        <UserDropdown />
                    </NavbarContent>
                </NavbarContent>
            </Navbar>
                {children}
        </div>
    );
    };