import type { NodeObjType, NodeType } from "./workflowSlice"





export const gmailApiConfig={

  "description": "Send or receive emails using Gmail API",
  "category": "communication",
  "auth": {
    "type": "oauth2",
    "provider": "google",
    "scopes": [
      "https://www.googleapis.com/auth/gmail.readonly",
      "https://www.googleapis.com/auth/gmail.send"
    ],
    "connectedAccountId": "acc_3456abcxyz"
  },
  "triggers": [
    {
      "id": "new_email",
      "name": "New Email",
      "description": "Trigger when a new email arrives in the inbox",
      "inputFields": [
        {
          "key": "from",
          "label": "Filter by sender email",
          "type": "string",
          "optional": true
        },
        {
          "key": "label",
          "label": "Gmail label to watch",
          "type": "string",
          "optional": true
        }
      ],
      "outputSchema": {
        "subject": "string",
        "from": "string",
        "body": "string",
        "date": "string"
      }
    }
  ],
  "actions": [
    {
      "id": "send_email",
      "name": "Send Email",
      "description": "Send an email using your Gmail account",
      "inputFields": [
        {
          "key": "to",
          "label": "Recipient Email",
          "type": "string",
          "required": true
        },
        {
          "key": "subject",
          "label": "Subject",
          "type": "string",
          "required": true
        },
        {
          "key": "body",
          "label": "Email Body",
          "type": "text",
          "required": true
        },
        {
          "key": "attachments",
          "label": "Attachments",
          "type": "file[]",
          "required": false
        }
      ],
      "outputSchema": {
        "messageId": "string",
        "status": "string"
      }
    }
  ],
  "sampleData": {
    "subject": "Welcome to your automation!",
    "from": "support@yourapp.com",
    "body": "This is a test email from your Gmail node."
  },
  
}


export function gmailNodeConfig(props: { id: string, label: string, icon: string }) {

    const { id, label, icon } = props
    const gmailNodeConfig: NodeObjType = {
        id,
        type: "gmailNode",
        category:"app",
        position: { x: 900 + Math.random() * 40, y: 120 + Math.random() * 240 },
        data: { label: label, icon: icon, ...gmailApiConfig,ui: {} },
        constraints: {
            nodeHandles: [
                {
                    name: "left",
                    type: "target",
                    LinkTo: [
                    { nodeName: 'inputNode', handlePosition: "right" },
                    { nodeName: 'outputNode', handlePosition: "right" },
                    { nodeName: 'driveNode', handlePosition: "right" },
                    { nodeName: 'slackNode', handlePosition: "right" },
                    { nodeName: 'notionNode', handlePosition: "right" },
                    { nodeName: 'discordNode', handlePosition: "right" },

                    ],
                },
                {
                    name: "right",
                    type: "source",
                    LinkTo: [
                        { nodeName: 'driveNode', handlePosition: 'left' },
                        { nodeName: 'slackNode', handlePosition: "left" },
                        { nodeName: 'notionNode', handlePosition: "left" },
                        { nodeName: 'discordNode', handlePosition: "left" },
                    ],
                },
            ],
        },
    }
    return gmailNodeConfig
}


