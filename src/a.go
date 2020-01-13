package main

import (
	_ "github.com/efjoubert/lnksys/db"
	_ "github.com/efjoubert/lnksys/iorw/active"
	lnks "github.com/efjoubert/lnksys/lnks"
	network "github.com/efjoubert/lnksys/network"
	os "os"
	runtime "runtime"
)

func main() {
	runtime.GOMAXPROCS(runtime.NumCPU())
	RunService(os.Args...)
}

func RunService(args ...string) {
	var lnksrvs, err = lnks.NewLnkService(RunBroker)
	if err == nil {
		err = lnksrvs.Execute(args...)
	}
	if err != nil {
		println(err)
	}
}

func RunBroker(exename string, exealias string, args ...string) {
	network.BrokerServeHttp(os.Stdout, os.Stdin, exename, exealias, args...)
}
