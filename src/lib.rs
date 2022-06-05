use netraffic::{
  device::{get_default_device, get_device},
  Filter, Traffic,
};

#[macro_use]
extern crate napi_derive;

#[napi(js_name = "Traffic")]
struct _Traffic {
  traffic: Traffic,
}

#[napi(object)]
pub struct _Snapshot {
  pub total: i64,
  pub len: i64,
}

#[napi]
impl _Traffic {
  #[napi(constructor)]
  pub fn new() -> Self {
    _Traffic {
      traffic: Traffic::new(),
    }
  }

  #[napi]
  pub fn add_listener(&mut self, interface_name: String, rule: String) {
    self.traffic.add_listener(Filter::new(interface_name, rule));
  }

  #[napi]
  pub fn remove_listener(&mut self, rule: String) {
    self.traffic.remove_listener(rule);
  }

  #[napi]
  pub fn suspend_listener(&mut self, rule: String) {
    self.traffic.suspend_listener(rule);
  }

  #[napi]
  pub fn resume_listener(&mut self, rule: String) {
    self.traffic.resume_listener(rule);
  }

  #[napi]
  pub fn get_data(&mut self, rule: String) -> _Snapshot {
    let s = *self.traffic.get_data().get(&rule).unwrap();
    _Snapshot {
      total: s.total as i64,
      len: s.len as i64,
    }
  }
}

#[napi]
fn _get_default_device() -> String {
  let device = get_default_device();
  if device.is_ok() {
    device.unwrap().name
  } else {
    "".to_string()
  }
}

#[napi]
fn _get_device() -> Vec<String> {
  let device = get_device();
  if device.is_ok() {
    device
      .unwrap()
      .iter()
      .map(|d| d.name.to_string())
      .collect::<Vec<_>>()
  } else {
    Vec::new()
  }
}
