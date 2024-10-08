import React from "react";
import { Sidebar } from "./sidebar.styles";
import { HomeIcon } from "../Icons/Sidebar/home-icon";
import { PaymentsIcon } from "../Icons/Sidebar/payments-icon";
import { CustomersIcon } from "../Icons/Sidebar/customers-icon";
import { ReportsIcon } from "../Icons/Sidebar/reports-icon";
import { CollapseItems } from "./collapse-items";
import { SidebarItem } from "./sidebar-item";
import { SidebarMenu } from "./sidebar-menu";
import { CompanyIcon} from "../Icons/Sidebar/company-icon";
import { FilterIcon } from "../Icons/Sidebar/filter-icon";
import { useSidebarContext } from "../Layouts/layout-context";
import { usePathname } from "next/navigation";
import { AccountsIcon } from "../Icons/Sidebar/accounts-icon";
import { GameIcon } from "../Icons/Sidebar/game-icon";
import { PlayerIcon } from "../Icons/Sidebar/player-icon";
import { SettingsIcon } from "../Icons/Sidebar/settings-icon";
import { PaymentMethodIcon } from "../Icons/Sidebar/payment-method-icon";
import { AggregatorIcon } from "../Icons/Sidebar/aggregator-icon";

export const SidebarWrapper = () => {
  const pathname = usePathname();
  const { collapsed, setCollapsed } = useSidebarContext();

  return (
    <aside className="h-screen z-[20] sticky top-0">
      {collapsed ? (
        <div className={Sidebar.Overlay()} onClick={setCollapsed} />
      ) : null}
      <div
        className={Sidebar({
          collapsed: collapsed,
        })}
      >
        <div className={Sidebar.Header()}>
            <div className="flex items-center gap-2">
            {/* {company.logo} */}
                <div className="flex flex-col gap-4">
                    <h3 className="text-xl font-medium m-0 text-default-900 -mb-4 whitespace-nowrap">
                    Admin Dashboard
                    </h3>
                </div>
            </div>
        </div>
        <div className="flex flex-col justify-between h-full">
          <div className={Sidebar.Body()}>
            <SidebarItem
              title="Home"
              icon={<HomeIcon />}
              isActive={pathname === "/"}
              href="/"
            />
 
            <SidebarMenu title="Main Menu">
              
            <SidebarItem
                isActive={pathname === "/accounts"}
                title="Accounts"
                icon={<AccountsIcon />}
                href="/accounts"
            />
            <SidebarItem
                isActive={pathname === "/customers"}
                title="Customers"
                icon={<CustomersIcon />}
                href="/customers"
            />
            <SidebarItem
              isActive={pathname === "/companies"}
              title="Companies"
              icon={<CompanyIcon />}
              href="/companies"
            />
            <SidebarItem
                isActive={pathname === "/players"}
                title="Players"
                icon={<PlayerIcon />}
                href="/players"
              />
            <SidebarItem
                isActive={pathname === "/games"}
                title="Games"
                icon={<GameIcon />}
                href="/games"
              />

            <SidebarItem
              isActive={pathname === "/transactions"}
              title="Transactions"
              icon={<PaymentsIcon />}
              href="/transactions"
            />

            <SidebarItem
              isActive={pathname === "/settings"}
              title="Settings"
              icon={<SettingsIcon />}
              href="/settings"
            />

              {/* <SidebarItem
                isActive={pathname === "/reports"}
                title="Reports"
                icon={<ReportsIcon />}
              /> */}
            </SidebarMenu>
            <SidebarMenu title="Billing Menu">
              <SidebarItem
                isActive={pathname === "/payment-methods"}
                title="Payment Methods"
                icon={<PaymentMethodIcon />}
                href="/payment-methods"
              />
              <SidebarItem
                isActive={pathname === "/aggregators"}
                title="Aggregators"
                icon={<AggregatorIcon />}
                href="/aggregators"
              />
            </SidebarMenu>
          </div>
        </div>
      </div>
    </aside>
  );
};