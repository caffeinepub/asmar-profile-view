import Map "mo:core/Map";
import Array "mo:core/Array";
import Text "mo:core/Text";
import Nat "mo:core/Nat";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";

actor {
  type Certification = {
    id : Nat;
    title : Text;
    issuer : Text;
    date : Text;
    credentialUrl : ?Text;
  };

  module Certification {
    public func compare(cert1 : Certification, cert2 : Certification) : Order.Order {
      Nat.compare(cert1.id, cert2.id);
    };
  };

  type Project = {
    id : Nat;
    title : Text;
    description : Text;
    techStack : [Text];
    liveUrl : ?Text;
    repoUrl : ?Text;
  };

  module Project {
    public func compare(proj1 : Project, proj2 : Project) : Order.Order {
      Nat.compare(proj1.id, proj2.id);
    };
  };

  let certificationMap = Map.empty<Nat, Certification>();
  let projectMap = Map.empty<Nat, Project>();

  var royaltyId = 1000;
  var projectId = 2000;

  public shared ({ caller }) func addCertification(title : Text, issuer : Text, date : Text, credentialUrl : ?Text) : async Certification {
    royaltyId += 1;
    let newCertification : Certification = {
      id = royaltyId;
      title;
      issuer;
      date;
      credentialUrl;
    };
    certificationMap.add(royaltyId, newCertification);
    newCertification;
  };

  public shared ({ caller }) func addProject(title : Text, description : Text, techStack : [Text], liveUrl : ?Text, repoUrl : ?Text) : async Project {
    projectId += 1;
    let newProject : Project = {
      id = projectId;
      title;
      description;
      techStack;
      liveUrl;
      repoUrl;
    };
    projectMap.add(projectId, newProject);
    newProject;
  };

  public query ({ caller }) func getCertification(id : Nat) : async Certification {
    switch (certificationMap.get(id)) {
      case (?certification) { certification };
      case (null) {
        Runtime.trap("Certification with ID " # id.toText() # " does not exist. ");
      };
    };
  };

  public query ({ caller }) func getAllCertifications() : async [Certification] {
    certificationMap.values().toArray().sort();
  };

  public query ({ caller }) func getProject(id : Nat) : async Project {
    switch (projectMap.get(id)) {
      case (?project) { project };
      case (null) {
        Runtime.trap("Project with ID " # id.toText() # " does not exist. ");
      };
    };
  };

  public query ({ caller }) func getAllProjects() : async [Project] {
    projectMap.values().toArray().sort();
  };

  public shared ({ caller }) func updateCertification(id : Nat, title : Text, issuer : Text, date : Text, credentialUrl : ?Text) : async Certification {
    switch (certificationMap.get(id)) {
      case (null) {
        Runtime.trap("Cannot update certification. ID " # id.toText() # " does not exist.");
      };
      case (?_) {
        let updatedCertification : Certification = {
          id;
          title;
          issuer;
          date;
          credentialUrl;
        };
        certificationMap.add(id, updatedCertification);
        updatedCertification;
      };
    };
  };

  public shared ({ caller }) func updateProject(id : Nat, title : Text, description : Text, techStack : [Text], liveUrl : ?Text, repoUrl : ?Text) : async Project {
    switch (projectMap.get(id)) {
      case (null) {
        Runtime.trap("Cannot update project. ID " # id.toText() # " does not exist.");
      };
      case (?_) {
        let updatedProject : Project = {
          id;
          title;
          description;
          techStack;
          liveUrl;
          repoUrl;
        };
        projectMap.add(id, updatedProject);
        updatedProject;
      };
    };
  };

  public shared ({ caller }) func seedData() : async () {
    let sampleCerts = [
      {
        id = 1001;
        title = "Certified Motoko Developer";
        issuer = "DFINITY Foundation";
        date = "2023-05-01";
        credentialUrl = ?"https://certs.dfinity.org/1001";
      },
      {
        id = 1002;
        title = "Web3 Security Fundamentals";
        issuer = "Blockchain Academy";
        date = "2022-11-15";
        credentialUrl = ?"https://certs.blockchain.academy/1002";
      },
      {
        id = 1003;
        title = "Cloud Computing Professional";
        issuer = "Cloud Certs Inc.";
        date = "2024-02-10";
        credentialUrl = ?"https://cloudcerts.com/1003";
      },
    ];
    for (cert in sampleCerts.values()) {
      certificationMap.add(cert.id, cert);
    };

    let sampleProjects = [
      {
        id = 2001;
        title = "Motoko Blog Platform";
        description = "A decentralized blog platform built with Motoko.";
        techStack = ["Motoko", "Internet Computer", "Bootstrap"];
        liveUrl = ?"https://motokoblog.icp0.io";
        repoUrl = ?"https://github.com/motokoblog";
      },
      {
        id = 2002;
        title = "Crypto Portfolio Tracker";
        description = "Track your crypto assets on the Internet Computer.";
        techStack = ["Motoko", "React", "ICP"];
        liveUrl = ?"https://cryptotracker.icp0.io";
        repoUrl = ?"https://github.com/cryptotracker";
      },
      {
        id = 2003;
        title = "Decentralized Task Manager";
        description = "A dapp for managing tasks securely on the blockchain.";
        techStack = ["Motoko", "Rust", "React"];
        liveUrl = ?"https://taskmanager.icp0.io";
        repoUrl = ?"https://github.com/taskmanager";
      },
    ];
    for (project in sampleProjects.values()) {
      projectMap.add(project.id, project);
    };
  };
};
