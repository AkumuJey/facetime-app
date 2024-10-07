"use client";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import React, { Dispatch, Fragment, SetStateAction, useState } from "react";
import { MeetingForm, MeetingLink } from "./CreateLink";

interface Props {
  enable: boolean;
  setEnable: Dispatch<SetStateAction<boolean>>;
}

export default function InstantMeeting({ enable, setEnable }: Props) {
  const [showMeetingLink, setShowMeetingLink] = useState(false);
  const [facetimeLink, setFacetimeLink] = useState<string>("");

  const closeModal = () => setEnable(false);

  return (
    <>
      <Transition appear show={enable} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
    </>
  );
}
