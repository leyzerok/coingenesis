"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { createProject } from "../actions";
import { createProjectSchema } from "../schemas";
import { useState } from "react";
import { useAccount } from "wagmi";
import ImageUpload from "../ImageUpload"; // Adjust the path as necessary

const SCORER_ID = process.env.NEXT_PUBLIC_SCORER_ID;
const APIKEY = process.env.NEXT_PUBLIC_APIKEY;

const headers = APIKEY
    ? {
        "Content-Type": "application/json",
        "X-API-Key": APIKEY,
    }
    : undefined;

const Deploy = () => {
    const [point, setPoint] = useState<number | undefined>(undefined);
    const { address } = useAccount();
    const [imageURL, setImageURL] = useState<string | null>(null);

    const form = useForm<z.infer<typeof createProjectSchema>>({
        resolver: zodResolver(createProjectSchema),
        defaultValues: {
            proposer: address as `0x${string}`,
            humanityScore: point?.toString() || "0",
            launchType: "CORPORATION",
        },
    });

    async function verifyGitcoinScore() {
        await signGitcoin();
        console.log(address);
        if (address === undefined) {
            setPoint(undefined);
            throw new Error("Wallet is not connected");
        }
        let address1 =
            "0x7fC78c95101D4bf54988Bb6E169E8552cA6773F1" as `0x${string}`; // address verified to be a human
        await sendPassportToScorer(address1);
        let pointForWallet = await getPassportScore(address1);
        setPoint(pointForWallet);
        form.setValue("humanityScore", pointForWallet?.toString() || "0");
    }

    async function signGitcoin() {
        const url = "https://api.scorer.gitcoin.co/registry/signing-message";
        const response = await fetch(url, {
            headers,
        });
    }

    async function setUrl(url: string) {
        form.setValue("imageURL", url);
    }

    async function sendPassportToScorer(address: `0x${string}` | undefined) {
        const url = "https://api.scorer.gitcoin.co/registry/submit-passport";
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "X-API-KEY": APIKEY !== undefined ? APIKEY : "",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ address, scorer_id: SCORER_ID }),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }
        } catch (err) {
            console.log("error: ", err);
        }
    }

    async function getPassportScore(
        currentAddress: `0x${string}` | undefined
    ): Promise<number | undefined> {
        const GET_PASSPORT_SCORE_URI = `https://api.scorer.gitcoin.co/registry/score/${SCORER_ID}/${currentAddress}`;
        try {
            const response = await fetch(GET_PASSPORT_SCORE_URI, {
                headers,
            });
            const passportData = await response.json();
            if (passportData.score) {
                console.log(passportData.score);
                return Math.round(passportData.score * 100) / 100;
            } else {
                console.log(
                    "No score available, please add Stamps to your passport and then resubmit."
                );
            }
        } catch (err) {
            console.log("error: ", err);
            return 0;
        }
    }

    return (
        <div className="flex flex-col items-center">
            <h2 className="text-3xl text-center py-14 font-bold">
                Token Deploy Proposal
            </h2>

            <div className="border border-black rounded-xl p-5 max-w-4xl min-w-[700px]">
                <div className="text-center">Corporate Deploy Proposal</div>
                <Form {...form}>
                <form className="flex flex-col gap-4" action={createProject}>
                        {/* HIDDEN FIELDS */}
                        <FormField
                            control={form.control}
                            name="imageURL"
                            defaultValue={address}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>ImageURL</FormLabel>
                                    <FormControl>
                                        <Input placeholder="0x" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="proposer"
                            defaultValue={address}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Proposer</FormLabel>
                                    <FormControl>
                                        <Input placeholder="0x" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="humanityScore"
                            defaultValue={point?.toString()}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Humanity Score</FormLabel>
                                    <FormControl>
                                        <Input placeholder="0" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="launchType"
                            defaultValue={"CORPORATION"}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Proposal type</FormLabel>
                                    <FormControl>
                                        <Input placeholder="0" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {/* NORMAL FIELDS */}
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="symbol"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Symbol</FormLabel>
                                    <FormControl>
                                        <Input placeholder="SYM" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Description</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Description" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="website"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Website</FormLabel>
                                    <FormControl>
                                        <Input placeholder="https://scroll.io" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="twitter"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Twitter</FormLabel>
                                    <FormControl>
                                        <Input placeholder="https://twitter.com/user" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="discord"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Discord</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="https://discord.com/invite/user"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="telegram"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Telegram</FormLabel>
                                    <FormControl>
                                        <Input placeholder="https://t.me/user" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="whitepaper"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Whitepaper URL</FormLabel>
                                    <FormControl>
                                        <Input placeholder="https://..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="team"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Team disclosure</FormLabel>
                                    <FormControl>
                                        <Input placeholder="" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="roadmap"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Roadmap</FormLabel>
                                    <FormControl>
                                        <Input placeholder="" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <ImageUpload setUrl={setUrl} />                        

                        <div className="flex w-full justify-center">
                            <Button
                                disabled={point === undefined || point <= 0}
                                type="submit"
                                className="w-full bg-black border border-black text-white py-4 px-8 text-lg rounded-full hover:bg-transparent hover:text-black transition max-w-2xl mb-4"
                            >
                                Submit Proposal
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>

            <div className="border border-black rounded-xl p-5 max-w-4xl min-w-[700px] m-5">
                <p className="text-center">Proof of Humanity via Gitcoin Passport</p>
                <div className="items-center justify-between flex p-5 gap-8">
                    {point !== undefined && (
                        <>
                            <div className="grid grid-cols-4 items-center rounded border border-gray-400 w-full h-max pb-2 pt-2">
                                <p className="w-full text-center">{point}</p>
                            </div>
                        </>
                    )}

                    <Button
                        onClick={verifyGitcoinScore}
                        className="w-full bg-transparent border border-black text-black py-4 px-8 text-lg rounded-full hover:bg-black hover:text-white transition"
                    >
                        Verify Score
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Deploy;
