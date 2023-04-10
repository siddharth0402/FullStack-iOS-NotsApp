//
//  AddNoteViewController.swift
//  Note-App2.0
//
//  Created by Siddharth Sonkusre on 10/04/23.
//

import UIKit

class AddNoteViewController: UIViewController {
    
    var note: Note?
    var update  = false
    
    
    
    @IBOutlet weak var titleTextField: UITextField!
    
    @IBOutlet weak var bodyTextView: UITextView!
    
    
    @IBOutlet weak var saveButton: UIBarButtonItem!
    
    @IBOutlet weak var deleteButton: UIBarButtonItem!
    
    
    
    
     
    @IBAction func deleteClick(_ sender: Any) {
        APIFunctions.functions.deleteNote(id: note!._id)
        self.navigationController?.popViewController(animated: true)

    }
    
    
    
    
    
    @IBAction func saveClick(_ sender: Any) {
        
        let dateFormatter = DateFormatter()
        dateFormatter.dateFormat = "yyy-MM-dd"
        let date = dateFormatter.string(from: Date())
        
        if update == true {
            APIFunctions.functions.updateNote(date: date, title: titleTextField.text!, note: bodyTextView.text, id: note!._id)
            self.navigationController?.popViewController(animated: true)
        }else if titleTextField.text != "" && bodyTextView.text != ""{
            APIFunctions.functions.AddNote(date: date, title: titleTextField.text!, note: bodyTextView.text)
            self.navigationController?.popViewController(animated: true)
        }
    }
    
    override func viewWillAppear(_ animated: Bool) {
        if ( update == false ){
            self.deleteButton.isEnabled = false
            self.deleteButton.title = ""
        }
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        if ( update == true){
            titleTextField.text = note!.title
            bodyTextView.text = note!.note
        }
        
      
        

        // Do any additional setup after loading the view.
    }
    

    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destination.
        // Pass the selected object to the new view controller.
    }
    */

}
