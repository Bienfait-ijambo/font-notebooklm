
export const drive={
  "id": "drive_node_1",
  "type": "drive",
  "name": "Google Drive",
  "description": "Upload, share, and organize files in Google Drive.",
  "icon": "https://www.gstatic.com/images/branding/product/2x/drive_48dp.png",
  "category": "storage",
  "auth": {
    "type": "oauth2",
    "provider": "google",
    "scopes": [
      "https://www.googleapis.com/auth/drive.file",
      "https://www.googleapis.com/auth/drive.readonly"
    ],
    "connectedAccountId": "acc_drive_456"
  },
  "triggers": [
    {
      "id": "new_file",
      "name": "New File Uploaded",
      "description": "Trigger when a new file is uploaded to a specific folder.",
      "inputFields": [
        {
          "key": "folder_id",
          "label": "Folder ID",
          "type": "string",
          "required": true
        }
      ],
      "outputSchema": {
        "file_id": "string",
        "name": "string",
        "mimeType": "string",
        "webViewLink": "string"
      }
    }
  ],
  "actions": [
    {
      "id": "upload_file",
      "name": "Upload File",
      "description": "Upload a file to Google Drive.",
      "inputFields": [
        {
          "key": "folder_id",
          "label": "Destination Folder ID",
          "type": "string",
          "required": false
        },
        {
          "key": "file_name",
          "label": "File Name",
          "type": "string",
          "required": true
        },
        {
          "key": "file_data",
          "label": "File Data (Base64 or path)",
          "type": "file",
          "required": true
        },
        {
          "key": "mimeType",
          "label": "MIME Type",
          "type": "string",
          "required": false
        }
      ],
      "outputSchema": {
        "file_id": "string",
        "webViewLink": "string",
        "size": "number"
      }
    }
  ],
  "sampleData": {
    "file_name": "report.pdf",
    "webViewLink": "https://drive.google.com/file/d/123abc/view"
  },
  "ui": {
    "color": "#0F9D58",
    "position": { "x": 420, "y": 320 }
  }
}




export const Gmail={
  "id": "gmail_node_1",
  "type": "gmail",
  "name": "Gmail",
  "description": "Send or receive emails using Gmail API",
  "icon": "https://www.gstatic.com/images/icons/material/system/1x/gmail_48dp.png",
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
  "ui": {
    "color": "#EA4335",
    "position": { "x": 220, "y": 180 }
  }
}
