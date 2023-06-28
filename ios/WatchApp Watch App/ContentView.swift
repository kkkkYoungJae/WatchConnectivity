//
//  ContentView.swift
//  WatchApp Watch App
//
//  Created by 김영재 on 2023/06/27.
//

import SwiftUI

struct ContentView: View {
  @ObservedObject var phoneConnector = PhoneConnector()
  
  var body: some View {
    VStack(alignment: .leading, spacing: 20) {
      VStack(alignment: .leading, spacing: 5) {
        Text("Send to Watch")
        Button {
          self.sendMessage()
        } label: {
          Text("Send")
        }
      }
      VStack(alignment: .leading, spacing: 5) {
        Text("Message from App")
        Text(self.phoneConnector.receivedMessage)
      }
    }
  }
  
  private func sendMessage() {
    let randomNumber = String(Int.random(in: 0..<1000))
    let message: [String: Any] = ["watchMessage": randomNumber]
    self.phoneConnector.session.sendMessage(message, replyHandler: nil) { (error) in
      print(error.localizedDescription)
    }
  }
}

struct ContentView_Previews: PreviewProvider {
  static var previews: some View {
    ContentView()
  }
}
