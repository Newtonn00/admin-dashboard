import { Card, CardHeader, CardBody } from "@nextui-org/react";

export default function UnauthorizedPage() {
    return (
    <Card>
        <CardHeader>
        <p>Unauthorized Access</p>
        </CardHeader>
        <CardBody>
        <p>You do not have permission to view this page. Please contact your administrator.</p>
        </CardBody>
    </Card>
    );
}