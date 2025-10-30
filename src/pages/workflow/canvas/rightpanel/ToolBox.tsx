import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Grid, Zap, Wrench, Search, Home, SplinePointer } from "lucide-react";
import QweenIcon from '@/assets/qwen-icon.svg'
import OpenAIIcon from '@/assets/openai-icon.svg'
import DeepSeekIcon from '@/assets/deepseek-icon.svg'
import MetaIcon from '@/assets/meta-icon.svg'
import GeminiIcon from '@/assets/gemini.png'
import GoogleIcon from '@/assets/google.png'
import SearchIcon from '@/assets/search.png'
import PineConeIcon from '@/assets/pinecone.png'
import Crawler from '@/assets/crawler.png'
import Memory from '@/assets/db.png'
import EmbeddingModal from '@/assets/embedding.png'
import Gmail from '@/assets/gmail.png'
import Drive from '@/assets/drive.png'
import Calendar from '@/assets/calendar.png'
import Slack from '@/assets/slack.png'
import NotionIcon from '@/assets/notion.png'
import { useDispatch, useSelector } from "react-redux";
import { addNode } from "@/store/workflow/workflowSlice";
import SlackIcon from '@/assets/slack.png'
import DiscordIcon from '@/assets/bot.png'
import type { RootState } from "@/store";













type TabKey = "apps" | "ai" | "tools";


type appListType='tool' | 'app' | 'model'| 'app_gmail'|"app_drive"|"app_calendar"|"app_notion"|'app_vector_db'|'app_slack'|'app_embedding'|'app_discord'
const APPS = [
    { type: "app_gmail", name: "Gmail", image: Gmail },
    { type: "app_drive", name: "Drive", image: Drive },
    { type: "app_calendar", name: "Calendar", image: Calendar },
    { type: "app_notion", name: "Notion", image: NotionIcon },
    { type: 'app_vector_db', name: "Vector DB", image: PineConeIcon },
    { type: 'app_slack', name: "Slack", image: SlackIcon },
 { type: 'app_embedding', name: "Embedding Model", image: EmbeddingModal },
 { type: 'app_discord', name: "Discord", image: DiscordIcon },



];

const AI_ITEMS = [
    { type: "model", name: "ChatGPT (OpenAI)", image: OpenAIIcon },
    { type: "model", name: "Deep Seek", image: DeepSeekIcon },
    { type: "model", name: "Qween", image: QweenIcon },
    { type: "model", name: "Meta", image: MetaIcon },
    { type: "model", name: "Gemini", image: GeminiIcon },

];

const TOOLS = [
    { type: 'tool', name: "Web Search", image: SearchIcon },

    { type: 'tool', name: "Web Scraper", image: Crawler },
    { type: 'tool', name: "Memory", image: Memory },
   
];




export default function LeftPanel() {
    const [active, setActive] = useState<TabKey>("apps");
    const [query, setQuery] = useState("");

    const list = React.useMemo(() => {
        const source = active === "apps" ? APPS : active === "ai" ? AI_ITEMS : TOOLS;
        if (!query.trim()) return source;
        const q = query.toLowerCase();
        return source.filter((item) => item.name.toLowerCase().includes(q));
    }, [active, query]);








    const dispatch = useDispatch();
    const { selectedNode } = useSelector((state: RootState) => state.flow);



    function showNode({ type, name, image }: { type: appListType, name: string, image: string }) {
        if (type == 'tool') {
            dispatch(addNode({ node: 'tool', icon: image, label: name }));
        }
        else if (type == 'model') {
            dispatch(addNode({ node: 'tool', icon: image, label: name }));

        }
         else if (type == 'app_gmail') {
            dispatch(addNode({ node: 'gmailNode', icon: Gmail, label: name }));

        }
        else if (type == 'app_discord') {
            dispatch(addNode({ node: 'discordNode', icon: DiscordIcon, label: name }));

        }
        else if (type == 'app_drive') {
            dispatch(addNode({ node: 'driveNode', icon: Drive, label: name }));

        }
        else if (type == 'app_embedding') {
            dispatch(addNode({ node: 'embeddingModelNode', icon: EmbeddingModal, label: name }));

        }
        else if (type == 'app_notion') {
            dispatch(addNode({ node: "notionNode", icon: NotionIcon, label: name }));

        }
         else if (type == 'app_slack') {
            dispatch(addNode({ node: 'slackNode', icon: SlackIcon, label: name }));

        }
        else if (type == 'app_vector_db') {
            dispatch(addNode({ node: 'vectordbNode', icon: PineConeIcon, label: name }));

        }
        else if (type == 'app_calendar') {
           dispatch(addNode({ node: 'calendarNode', icon: Calendar, label: name }));
        }
    }


    return (
        <div className="flex flex-col h-[720px] w-full max-w-3xl">
            {/* Horizontal Tabs */}
            <div className="bg-white/60 dark:bg-slate-900/40 flex items-center justify-between">
                <div className="flex items-center gap-4 ">
                    <TabButton
                        icon={<Home className="h-4 w-4" />}
                        label="Apps"
                        active={active === "apps"}
                        onClick={() => setActive("apps")}
                    />
                    <TabButton
                        icon={<Zap className="h-4 w-4" />}
                        label="AI"
                        active={active === "ai"}
                        onClick={() => setActive("ai")}
                    />
                    <TabButton
                        icon={<SplinePointer className="h-4 w-4" />}
                        label="Tools"
                        active={active === "tools"}
                        onClick={() => setActive("tools")}
                    />
                </div>


            </div>

            {/* Main Content */}
            <main className="flex-1 ml-[-15px]">
                <Card className="h-full shadow-none border-none rounded-md bg-transparent">
                    <CardContent className="h-full  flex flex-col">


                        <div className="w-72">
                            <label htmlFor="search" className="sr-only">
                                Search
                            </label>
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 opacity-60" />
                                <Input
                                    id="search"
                                    placeholder={`Search ${active}...`}
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    className="pl-9 text-xs"
                                />
                            </div>
                        </div>

                        <div className="flex-1 min-h-0">
                            <ScrollArea className="h-full">
                                <ul className="space-y-1 mt-2">
                                    {list.map((item) => (

                                        <li key={item.name} onClick={() => showNode(item)} className="p-2 cursor-pointer flex items-center gap-2 hover:bg-muted/30 rounded-lg">
                                            <img src={item.image} alt={item.name} className="h-8 w-8" />
                                            <div className="flex-1">
                                                <div className="text-sm font-medium">{item.name}</div>
                                            </div>
                                        </li>
                                        //   <li
                                        //     key={app}
                                        //     className="p-1 rounded-lg hover:bg-muted/30 transition-colors flex items-center gap-3"
                                        //   >
                                        //     <div className="h-9 w-9   flex items-center justify-center">
                                        //       {/* <Grid className="h-4 w-4" /> */}
                                        //       <img src={QweenIcon} alt="" />
                                        //     </div>
                                        //     <div className="flex-1">
                                        //       <div className="text-sm font-medium">{app}</div>

                                        //     </div>
                                        //     <div>
                                        //       <Button size="sm" variant="outline">
                                        //         Connect
                                        //       </Button>
                                        //     </div>
                                        //   </li>
                                    ))}

                                    {list.length === 0 && (
                                        <li className="p-6 text-center text-sm text-muted-foreground">
                                            No results
                                        </li>
                                    )}
                                </ul>
                            </ScrollArea>
                        </div>
                    </CardContent>
                </Card>
            </main>

        </div>
    );
}

function TabButton({
    icon,
    label,
    active,
    onClick,
}: {
    icon: React.ReactNode;
    label: string;
    active?: boolean;
    onClick?: () => void;
}) {
    return (
        <button
            onClick={onClick}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors text-sm font-medium focus:outline-none focus:ring-2 focus:ring-ring ${active ? "bg-muted text-foreground" : "hover:bg-muted/40"
                }`}
            aria-pressed={active}
        >
            <span className="flex items-center text-gray-600 justify-center">{icon}</span>
            <span className="truncate text-gray-600">{label}</span>
        </button>
    );
}
