import { google } from 'googleapis';
import { readFileSync } from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const keyPath = path.join(__dirname, '..', process.env.GOOGLE_APPLICATION_CREDENTIALS || './credentials/contemp-413621-8b4bd83ae9a3.json');

const keyFile = readFileSync(keyPath);
const key = JSON.parse(keyFile.toString());

const scopes = ['https://www.googleapis.com/auth/analytics.readonly'];
const jwtClient = new google.auth.JWT(key.client_email, undefined, key.private_key, scopes);
