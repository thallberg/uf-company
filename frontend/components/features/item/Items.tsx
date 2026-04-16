"use client";

import { itemContent } from "@/content/item/Item.content";
import { SingleItem } from "./SingleItem";


export function Item() {
    return (
        <div className="container mx-auto px-6">
            <div className="flex flex-col divide-y md:grid md:grid-cols-4 md:divide-y-0 md:gap-6">

                {itemContent.items.map((item, i) => (
                    <div
                        key={i}
                        className="flex py-4 w-full md:py-0"
                    >
                        <div className="w-full">
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