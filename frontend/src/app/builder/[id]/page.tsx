"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { use } from "react";
import FormBuilder from "../page";
import { title } from "process";
import { div } from "motion/react-client";

const dummyContent = [
  {
    type: "formTitle",
    props: {
      title: "Dummy Form Title",
    },
  },
  {
    type: "shortText",
    props: {
      question: "What is your name",
      placeholder: "Enter your name",
    },
  },
];

export default function FormEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [content, setContent] = useState();
  const { getToken } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const { id } = use(params);

  function structureToBlock(formData) {
    console.log("Parsing structure:", formData);
    const blocks: any = [];

    //ad title of the page first
    if (formData?.title) {
      blocks.push({
        id: `form-title-${Date.now()}`,
        type: "formTitle",
        props: {
          title: formData.title,
          description: formData.description || "",
        },
        content: [],
      });
    }

    //add all the blocks from pages
    formData.content?.forEach((page: any, index) => {
      //add page break
      if (index > 0) {
        blocks.push({
          id: `page-break-${Date.now()}`,
          type: "pageBreak",
          props: page.props || {},
          content: [],
        });
      }

      //add content block
      page.content?.forEach((block: any) => {
        blocks.push({
          ...block,
          id: block.id || `block-${Date.now()}-${Math.random()}`,
        });
      });
    });

    //return the blocks
    return blocks;
  }

  useEffect(() => {
    console.log("Form ID from params:", id);

    const loadForm = async () => {
      try {
        console.log("Attempting to fetch form...");
        const token = await getToken();
        console.log("Got token, making request...");

        const response = await fetch(`http://localhost:3001/api/forms/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Response status:", response.status);

        if (response.ok) {
          const formData = await response.json();
          console.log("Form data received:", formData);
          console.log("Content type:", typeof formData.content);
          const blocks = await structureToBlock(formData);
          console.log(blocks);
          setContent(blocks);
        } else {
          console.log("Failed to fetch form");
        }
      } catch (error) {
        console.error("Error loading form:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadForm();
    }
  }, [id]);

  if (loading) {
    return <div>Loading form...</div>;
  }

  return (
    <FormBuilder
      formId={id}
      initialContent={content}
      formMetadata={{ title: "Dummy content" }}
    ></FormBuilder>
  );
}
