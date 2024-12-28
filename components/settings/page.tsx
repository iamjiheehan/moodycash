import { Card, CardContent, CardHeader } from '@/components/ui/card';

type BankingInfoCardProps = {
    moodInfo: {
        name: string;
        description: string;
    };
    bankingInfo: {
        name: string;
        account: string;
    };
    children?: React.ReactNode;
};

function MoodSettingCard({
    bankingInfo,
    moodInfo,
    children,
}: BankingInfoCardProps) {
    return (
        <Card className="relative">
            <CardHeader>
                <h1> Account for {moodInfo.name} mood</h1>
                <h2>{moodInfo.description}</h2>
            </CardHeader>
            <CardContent>
                {bankingInfo.name}
                {bankingInfo.account}
            </CardContent>
            {/* delete button later */}
            <div className="absolute top-0 right-3 h-full py-2">{children}</div>
        </Card>
    );
}

export default MoodSettingCard;
