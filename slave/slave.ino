#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
//#include <WebSocketsClient.h>

///WebSocketsClient webSocket;
const byte numChars = 32;
char receivedChars[numChars];   // an array to store the received data
boolean newData = false;
bool connected = false;
//String path = "192.168.43.226";
//String path = "indoor-localization-sbme.herokuapp.com" ;
int port = 80;
String url = "/master" ;
char * username = "STUDBME2" ;
char * password = "BME2Stud";
const char* serverName = "http://172.28.133.138:3000/";
int chacterSent= 0;

void setup() {
  Serial.begin(38400);
  connectWifi();
//  connectSocket();
}

void loop() {
//  webSocket.loop();

  recvWithEndMarker();
  sendServer();
  delay(500);
}

//void connectSocket() {
//  // server address, port and URL
//  //webSocket.begin("localization-hamdy-server.herokuapp.com", 8082, "/","text");
//  Serial.println("Trying to connect to web_socket  === " + path + ":" + String(port) + url );
//  webSocket.begin(path, port, url , "text");
//  // event handler
//  webSocket.onEvent(webSocketEvent);
//}
void recvWithEndMarker() {
  static byte ndx = 0;
  char endMarker = '\n';
  char rc;
  while (Serial.available() > 0 && newData == false) {
    rc = Serial.read();

    if (rc != endMarker) {
      receivedChars[ndx] = rc;
      ndx++;
      if (ndx >= numChars) {
        ndx = numChars - 1;
        
      }
    }
    else {
      receivedChars[ndx] = '\0'; // terminate the string
      chacterSent = ndx;
      ndx = 0;
      newData = true;
    }
  }
}

void sendServer() {
  if (newData == true) {
//    webSocket.sendTXT(receivedChars);
      WiFiClient client;
      HTTPClient http;
      String serverPath = "http://172.28.133.138:3000/";
      for (int i=0 ; i<chacterSent-1;i++){
        serverPath = serverPath + String(receivedChars[i]);
        }
      http.begin(client, serverPath.c_str());
      String payload = http.getString(); 
      int httpResponseCode = http.GET();
      http.end();
      delay(100);
      serverPath = "http://172.28.133.138:3000/change-state";
      http.begin(client, serverPath.c_str());
      httpResponseCode = http.GET();
      payload = http.getString(); 
      Serial.println(payload);
      http.end();
      newData = false;
  }
}
//
//void webSocketEvent(WStype_t type, uint8_t * payload, size_t length) {
//  switch (type) {
//    case WStype_DISCONNECTED:
//      Serial.printf("[WSc] Disconnected!\n");
//      connected = false;
//      break;
//    case WStype_CONNECTED:
//      Serial.printf("[WSc] Connected to url: %s\n", payload);
//      connected = true;
//      break;
//    //when we recieve data but we will not recievw any data
//    case WStype_TEXT:
//      //Serial.printf("[WSc] RESPONSE: %s\n", payload);
//      Serial.println((char *)payload);
//      break;
//  }
//
//}
void connectWifi() {

  WiFi.begin(username, password);
  Serial.println("Connecting");
  uint8_t i = 0;
  while (WiFi.status() != WL_CONNECTED && i < 20) {
    Serial.print(".");
    delay(500);
    i++;
  }
  Serial.print("Connected to WiFi network with IP Address: ");
  Serial.println(WiFi.localIP());
}
