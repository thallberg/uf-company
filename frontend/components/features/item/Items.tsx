"use client";

import { itemContent } from "@/content/item/Item.content";
import { SingleItem } from "./SingleItem";


export function Item() {
    return (
        <div className="container mx-auto px-6">
            <div className="flex flex-col divide-y gap-4 sm:flex-row sm:divide-none">

                {itemContent.items.map((item, i) => (
                    <div
                        key={i}
                        className="flex w-full"
                    >
                        <div className="w-full py-6">
                            <SingleItem
                                icon={item.icon}
                                title={item.title}
                                description={item.description}
                            />
                        </div>
                    </div>
                ))}

            </div>
        </div>
    );
}