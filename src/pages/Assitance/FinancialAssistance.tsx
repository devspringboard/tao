import { TaoLayout } from "../../components/Layout/TaoLayout";
import SearchComponent from "../../components/SearchComponent";
import { RequestComponent } from "../../components/RequestComponent";
import { useGetActiveAssistance } from "../../services/queries/financial-assistance/financialAssistanceQuery";
import { useAssistanceLogo } from "../../hooks/useAssistanceLogo";
import { useState } from "react";
import { Skeleton } from "@heroui/react";
import { useHistory } from "react-router";
export default function FinancialAssistance() {
    const { assistanceLists, isLoading: isLoadingAssistance } = useGetActiveAssistance();
    const [search, setSearch] = useState("");
    const history = useHistory();

    const filteredAssistanceLists = assistanceLists?.filter((assistance: any) =>
        assistance.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <TaoLayout>
            <div className=" container flex flex-col items-center px-[16px] py-[13px] mx-auto">
                <h1 className="text-tao-charcoal-900 text-[24px] font-[500] self-stretch mb-[20px]">
                    Financial Assistance
                </h1>

                <div className="flex flex-col gap-[15px] self-stretch">
                    <SearchComponent search={search} setSearch={setSearch} />

                    {filteredAssistanceLists?.length > 0 ? (
                        filteredAssistanceLists?.map((assistance: any) => (
                            <RequestComponent
                                key={assistance.id}
                                image={useAssistanceLogo(assistance.id)?.logo}
                                title={assistance.title}
                                content={assistance.description}
                                handleAssistance={() =>
                                    history.push(`/assistance-documents/${assistance.id}`, {
                                        program_name: assistance.title,
                                    })
                                }
                            />
                        ))
                    ) : (
                        <div className="flex flex-col items-center justify-center gap-[15px] py-[50px] self-stretch">
                            <p className="text-tao-charcoal-300 text-[16px] font-[400]">
                                No assistance found
                            </p>
                        </div>
                    )}

                    {isLoadingAssistance && (
                        <div className="flex flex-col gap-[15px] self-stretch">
                            <Skeleton className="w-full h-[300px]" />
                            <Skeleton className="w-full h-[300px]" />
                        </div>
                    )}
                </div>
            </div>
        </TaoLayout>
    );
}
