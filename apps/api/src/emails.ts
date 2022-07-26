export interface Email {
  id:       string;
  username: string;
  quota:    number;
  domainId: string;
}

export const emails: Email[] = [
  {"id": "1", "username": "user1-lau", "quota": 10, "domainId": "1"},
  {"id": "2", "username": "user2-lau", "quota": 20, "domainId": "1"},
  {"id": "3", "username": "user3-lau", "quota": 30, "domainId": "1"},
  {"id": "4", "username": "user1-ana", "quota": 40, "domainId": "3"},
  {"id": "5", "username": "user2-ana", "quota": 50, "domainId": "3"},
  {"id": "6", "username": "user3-ana", "quota": 60, "domainId": "3"},
]
