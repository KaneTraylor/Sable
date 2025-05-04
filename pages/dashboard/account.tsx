// pages/dashboard/account.tsx
import { Box, Container, SimpleGrid } from "@chakra-ui/react";
import AccountNameCard from "@/components/dashboard/account/AccountNameCard";
import PaymentMethodsCard from "@/components/dashboard/account/PaymentMethodsCard";
import BankAccountsCard from "@/components/dashboard/account/BankAccountsCard";
import LanguageToggleCard from "@/components/dashboard/account/LanguageToggleCard";
import LogoutCard from "@/components/dashboard/account/LogoutCard";
import PersonalInfoCard from "@/components/dashboard/account/PersonalInfoCard";
import SupportCard from "@/components/dashboard/account/SupportCard";
import SecurityCard from "@/components/dashboard/account/SecurityCard";
import ReferralCard from "@/components/dashboard/account/ReferralCard";
import MailingLink from "@/components/dashboard/account/MailingLink";

export default function AccountPage() {
  return (
    <Box bg="#f9f5f1" minH="100vh" py={8}>
      <Container maxW="6xl">
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} alignItems="start">
          {/* Left Column */}
          <Box>
            <AccountNameCard />
            <PaymentMethodsCard />
            <BankAccountsCard />
            <LanguageToggleCard />
            <LogoutCard />
            <MailingLink />
          </Box>

          {/* Right Column */}
          <Box>
            <PersonalInfoCard />
            <SupportCard />
            <SecurityCard />
            <ReferralCard />
          </Box>
        </SimpleGrid>
      </Container>
    </Box>
  );
}
