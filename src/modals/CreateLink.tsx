"use client";
import React from "react";
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Dispatch, Fragment, SetStateAction, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { FaCopy } from "react-icons/fa";
interface Props {
  enable: boolean;
  setEnable: Dispatch<SetStateAction<boolean>>;
}

const CreateLink = ({ enable, setEnable }: Props) => {
  const [showMeetingLink, setShowMeetingLink] = useState(false);
  const [facetimeLink, setFacetimeLink] = useState<string>("");
  const closeModal = () => setEnable(false);
  return (
    <Transition appear show={enable} as={Fragment}>
      <Dialog className="relative z-10" onClose={closeModal}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/75" />
        </TransitionChild>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 align-middle shadow-xl transition-all text-center">
                {showMeetingLink ? (
                  <MeetingLink facetimeLink={facetimeLink} />
                ) : (
                  <MeetingForm
                    setShowMeetingLink={setShowMeetingLink}
                    setFacetimeLink={setFacetimeLink}
                  />
                )}
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export const MeetingForm = ({
  setShowMeetingLink,
  setFacetimeLink,
}: {
  setShowMeetingLink: React.Dispatch<SetStateAction<boolean>>;
  setFacetimeLink: Dispatch<SetStateAction<string>>;
}) => {
  const [description, setDescription] = useState<string>("");
  const [dateTime, setDateTime] = useState<string>("");

  const handleStartMeeting = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ description, dateTime });
  };

  return (
    <>
      <DialogTitle
        as="h3"
        className="text-lg font-bold leading-6 text-green-600"
      >
        Schedule a FaceTime
      </DialogTitle>

      <Description className="text-xs opacity-40 mb-4">
        Schedule a FaceTime meeting with your cliq
      </Description>
      <form className="w-full" onSubmit={handleStartMeeting}>
        <label
          className="block text-left text-sm font-medium text-gray-700"
          htmlFor="description"
        >
          Meeting Description
        </label>
        <input
          type="text"
          name="description"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 block w-full text-sm py-3 px-4 border-gray-200 border-[1px] rounded mb-3"
          required
          placeholder="Enter a description for the meeting"
        />

        <label
          className="block text-left text-sm font-medium text-gray-700"
          htmlFor="date"
        >
          Date and Time
        </label>

        <input
          type="datetime-local"
          id="date"
          name="date"
          required
          className="mt-1 block w-full text-sm py-3 px-4 border-gray-200 border-[1px] rounded mb-3"
          value={dateTime}
          onChange={(e) => setDateTime(e.target.value)}
        />

        <button className="w-full bg-green-600 text-white py-3 rounded mt-4">
          Create FaceTime
        </button>
      </form>
    </>
  );
};

export const MeetingLink = ({ facetimeLink }: { facetimeLink: string }) => {
  const [copied, setCopied] = useState<boolean>(false);
  const handleCopy = () => setCopied(true);

  return (
    <>
      <DialogTitle
        as="h3"
        className="text-lg font-bold leading-6 text-green-600"
      >
        Copy FaceTime Link
      </DialogTitle>

      <Description className="text-xs opacity-40 mb-4">
        You can share the facetime link with your participants
      </Description>

      <div className="bg-gray-100 p-4 rounded flex items-center justify-between">
        <p className="text-xs text-gray-500">
          {`${process.env.NEXT_PUBLIC_FACETIME_HOST}/${facetimeLink}`}
        </p>

        <CopyToClipboard
          onCopy={handleCopy}
          text={`${process.env.NEXT_PUBLIC_FACETIME_HOST}/${facetimeLink}`}
        >
          <FaCopy className="text-green-600 text-lg cursor-pointer" />
        </CopyToClipboard>
      </div>

      {copied && (
        <p className="text-red-600 text-xs mt-2">Link copied to clipboard</p>
      )}
    </>
  );
};

export default CreateLink;
